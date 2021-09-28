const DM = new DataManager();
const CM = new ContentManager();

document.querySelector('#data-0').addEventListener('click', () => {
    DM.setActiveDataset(0);
    CM.toggleMenu(0);
});
document.querySelector('#data-1').addEventListener('click', () => {
    DM.setActiveDataset(1);
    CM.toggleMenu(1);
});
document.querySelector('#data-2').addEventListener('click', () => {
    DM.setActiveDataset(2);
    CM.toggleMenu(2);
});
document.querySelector('#data-4').addEventListener('click', () => {
    DM.setActiveDataset(4);
    CM.toggleMenu(3);
});

document.querySelector('#chart0').addEventListener('click', () => {
    DM.displayChart(0, 0, 0, 100);
});
document.querySelector('#chart5').addEventListener('click', () => {
    DM.displayChart(0, 5, 0, 200);
});
document.querySelector('#chart1').addEventListener('click', () => {
    DM.displayChart(1, 1, 0, 100);
});
document.querySelector('#chart2').addEventListener('click', () => {
    DM.displayChart(2, 2, 0, 100);
});
document.querySelector('#chart3').addEventListener('click', () => {
    DM.displayChart(3, 3, 0, 100);
});
document.querySelector('#chart4').addEventListener('click', () => {
    DM.displayChart(4, 4, 0, 100);
});
document.querySelector('#chart6').addEventListener('click', () => {
    DM.displayChart(0, 6, 0, 200);
});
document.querySelector('#chart7').addEventListener('click', () => {
    DM.displayChart(4, 7, 0, 300);
});
document.querySelector('#chart8').addEventListener('click', () => {
    DM.displayChart(2, 8, 0, 100);
});
document.querySelector('#chart9').addEventListener('click', () => {
    DM.displayChart(4, 9, 1, 100);
});

document.querySelector('#project-details').addEventListener('click', () => {
    CM.displayProjectDetails();
});
document.querySelector('#close-button').addEventListener('click', () => {
    CM.hideProjectDetails();
});