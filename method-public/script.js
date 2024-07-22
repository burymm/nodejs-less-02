window.onFormSubmit = (event) => {
    event.preventDefault();
}

window.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('#submitBtn');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const nameInput = document.querySelector('#name');

        fetch("/api/people", {
            method: "POST",
            body: JSON.stringify({
                name: nameInput.value,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((data) => {
            console.log(data);
            fetchData();
        }).catch((error) => {
            console.log('some error', error);
        });
    });

    fetchData();
});

async function fetchData() {
    const response = await  fetch('/api/people', {
        method: 'GET',
    });

    const data = await response.json();
    console.log('data', data.data);

    const tableBody = document.querySelector('#table-body');
    tableBody.innerHTML = '';

    let domArray = data.data.map((item) => {
        const row = document.createElement('tr');

        const idTd = document.createElement('td');
        idTd.innerText = item.id ?? '-';
        row.appendChild(idTd);

        const nameTd = document.createElement('td');
        nameTd.innerText = item.name ?? (item.lastName && item.firstName && `${item.lastName} ${item.firstName}`) ?? '-';
        row.appendChild(nameTd);

        const ageTd = document.createElement('td');
        ageTd.innerText = item.age ?? '-';
        row.appendChild(ageTd);

        return row;
    });

    domArray.forEach((tr) => {
       tableBody.appendChild(tr);
    });
}