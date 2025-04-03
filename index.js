const partyListEl = document.getElementById('party-list');
const formEl = document.getElementById('party-form');
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-FTB-ET-WEB-PT/events';

async function fetchParties() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderParties(data.data);
    } catch (error) {
        console.error('Error fetching parties:', error);
    }
}

function renderParties(parties) {
    partyListEl.innerHTML = '';
    parties.forEach(party => {
        const partyEl = document.createElement('div');
        partyEl.className = 'party-item';
        partyEl.innerHTML = `
            <strong>${party.name}</strong>
            - ${new Date(party.date).toLocaleDateString()} 
            at ${new Date(party.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})},
            ${party.location} (${party.description})
            <button onclick="deleteParty(${party.id})">Delete</button>
        `;
        partyListEl.appendChild(partyEl);
    });
}

async function deleteParty(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchParties();
    } catch (error) {
        console.error('Error deleting party:', error);
    }
}

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newParty = {
        name: document.getElementById('name').value,
        date: new Date(`${document.getElementById('date').value}T${document.getElementById('time').value}`).toISOString(),
        location: document.getElementById('location').value,
        description: document.getElementById('description').value,
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newParty)
        });
        formEl.reset();
        fetchParties();
    } catch (error) {
        console.error('Error adding party:', error);
    }
});

fetchParties();