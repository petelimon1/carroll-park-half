
document.addEventListener('DOMContentLoaded', function () {
    const yearSelect = document.getElementById('yearSelect');
    const resultsContainer = document.getElementById('resultsContainer');

    for (let year = 1890; year <= 2024; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    yearSelect.addEventListener('change', () => {
        const year = yearSelect.value;
        const runners = [];

        const numRunners = Math.min(2 + Math.floor((year - 1890) / 10), 50);
        for (let i = 1; i <= numRunners; i++) {
            runners.push({
                name: `Runner ${i} (${year})`,
                time: `${1 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
            });
        }

        resultsContainer.innerHTML = `<h2>Results for ${year}</h2>` +
            '<ul>' + runners.map(r => `<li>${r.name} – ${r.time}</li>`).join('') + '</ul>';
    });
});
