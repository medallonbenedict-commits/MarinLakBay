const checklistInputs = [...document.querySelectorAll('input[name="eco-task"]')];
const progressLabel = document.querySelector('#progress-label');
const progressBar = document.querySelector('#progress-bar');
const progressFill = document.querySelector('#progress-fill');
const progressMessage = document.querySelector('#progress-message');
const checklistStorageKey = 'marinlakbay-checklist-v1';
const visitsStorageKey = 'marinlakbay-visits-v1';

function readStorage(key, fallback) {
	try {
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : fallback;
	} catch {
		return fallback;
	}
}

function writeStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}

function updateChecklist() {
	const completed = checklistInputs.filter((input) => input.checked).length;
	const total = checklistInputs.length;
	progressLabel.textContent = `${completed} of ${total} done`;
	progressBar.setAttribute('aria-valuenow', String(completed));
	progressFill.style.width = `${total ? (completed / total) * 100 : 0}%`;
	progressMessage.textContent = completed === total
		? 'Lovely. You are ready to travel thoughtfully.'
		: completed === 0
			? 'Every thoughtful choice counts.'
			: 'A good start. Keep going at your own pace.';
	writeStorage(checklistStorageKey, checklistInputs.filter((input) => input.checked).map((input) => input.value));
}

const savedChecklist = readStorage(checklistStorageKey, []);
checklistInputs.forEach((input) => {
	input.checked = savedChecklist.includes(input.value);
	input.addEventListener('change', updateChecklist);
});
updateChecklist();

document.querySelector('#reset-checklist').addEventListener('click', () => {
	checklistInputs.forEach((input) => { input.checked = false; });
	updateChecklist();
});

const visitForm = document.querySelector('#visit-form');
const entriesList = document.querySelector('#entries-list');
const entryCount = document.querySelector('#entry-count');
const formStatus = document.querySelector('#form-status');
let visits = readStorage(visitsStorageKey, []);
if (!Array.isArray(visits)) visits = [];

function renderVisits() {
	entriesList.replaceChildren();
	entryCount.textContent = `${visits.length} ${visits.length === 1 ? 'NOTE' : 'NOTES'}`;

	if (visits.length === 0) {
		const emptyRow = document.createElement('tr');
		const emptyState = document.createElement('td');
		emptyState.className = 'empty-state';
		emptyState.colSpan = 5;
		emptyState.textContent = 'Your first island note is waiting to be written.';
		emptyRow.append(emptyState);
		entriesList.append(emptyRow);
		return;
	}

	[...visits].reverse().forEach((visit) => {
		const entry = document.createElement('tr');
		entry.className = 'entry-row';
		const title = document.createElement('td');
		title.dataset.label = 'Destination';
		title.textContent = visit.destination;
		const date = document.createElement('span');
		date.className = 'entry-date';
		date.textContent = new Date(`${visit.date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
		const dateCell = document.createElement('td');
		dateCell.dataset.label = 'Date';
		dateCell.append(date);
		const rating = document.createElement('span');
		rating.className = 'entry-rating';
		rating.setAttribute('aria-label', `Rating: ${visit.rating} out of 5`);
		rating.textContent = `${'★'.repeat(visit.rating)}${'☆'.repeat(5 - visit.rating)}`;
		const ratingCell = document.createElement('td');
		ratingCell.dataset.label = 'Rating';
		ratingCell.append(rating);
		entry.append(title, dateCell, ratingCell);

		const notes = document.createElement('td');
		notes.className = 'entry-notes';
		notes.dataset.label = 'Notes';
		notes.textContent = visit.notes || '—';
		entry.append(notes);

		const actions = document.createElement('td');
		actions.className = 'entry-actions';
		actions.dataset.label = 'Actions';
		const removeButton = document.createElement('button');
		removeButton.className = 'delete-entry';
		removeButton.type = 'button';
		removeButton.textContent = 'Remove note';
		removeButton.setAttribute('aria-label', `Remove note for ${visit.destination}`);
		removeButton.addEventListener('click', () => {
			visits = visits.filter((item) => item.id !== visit.id);
			const stored = writeStorage(visitsStorageKey, visits);
			renderVisits();
			formStatus.textContent = stored ? 'Note removed.' : 'Note removed for this session.';
		});
		actions.append(removeButton);
		entry.append(actions);
		entriesList.append(entry);
	});
}

visitForm.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!visitForm.reportValidity()) return;

	const formData = new FormData(visitForm);
	const destination = String(formData.get('destination')).trim();
	if (!destination) {
		formStatus.textContent = 'Enter a destination name.';
		visitForm.elements.destination.focus();
		return;
	}

	const rating = Number(formData.get('rating'));
	if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
		formStatus.textContent = 'Choose a rating from 1 to 5.';
		return;
	}

	visits.push({
		id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
		destination,
		date: String(formData.get('date')),
		rating,
		notes: String(formData.get('notes')).trim()
	});
	const stored = writeStorage(visitsStorageKey, visits);
	renderVisits();
	visitForm.reset();
	formStatus.textContent = stored
		? 'Your memory has been saved on this device.'
		: 'Your memory is saved for this session; browser storage is unavailable.';
});

renderVisits();
