class ContentManager {

    #dataButtons;
    #menus;

    constructor() {
        this.#dataButtons = [];
        this.#dataButtons.push(document.querySelector('#chart0'));
        this.#dataButtons.push(document.querySelector('#chart1'));
        this.#dataButtons.push(document.querySelector('#chart2'));
        this.#dataButtons.push(document.querySelector('#chart3'));
        this.#dataButtons.push(document.querySelector('#chart4'));
        this.#dataButtons.push(document.querySelector('#chart5'));
        this.#dataButtons.push(document.querySelector('#chart6'));
        this.#dataButtons.push(document.querySelector('#chart7'));
        this.#dataButtons.push(document.querySelector('#chart8'));
        this.#dataButtons.push(document.querySelector('#chart9'));

        this.annotationFields = [];
        this.annotationFields.push(document.querySelector('#death-table'));
        this.annotationFields.push(document.querySelector('#death-line'));
        this.annotationFields.push(document.querySelector('#naples-bar'));
        this.annotationFields.push(document.querySelector('#pump-map'));
        this.annotationFields.push(document.querySelector('#naples-pie'));
        this.annotationFields.push(document.querySelector('#naples-table'));
        this.annotationFields.push(document.querySelector('#census-table'));
        this.annotationFields.push(document.querySelector('#census-age-pie'));
        this.annotationFields.push(document.querySelector('#census-bar'));
        this.annotationFields.push(document.querySelector('#census-gender-pie'));

        this.vizHeader = document.querySelector('#vizHeader');
        this.output = document.querySelector('#output');
        this.#menus = [
            {
                e: document.querySelector('#sub-0'),
                maxHeight: '9vh'
            },
            {
                e: document.querySelector('#sub-1'),
                maxHeight: '14vh'
            },
            {
                e: document.querySelector('#sub-2'),
                maxHeight: '6vh'
            },
            {
                e: document.querySelector('#sub-3'),
                maxHeight: '19vh'
            }];
    };

    setOverlayTitle = text => {
        document.querySelector('#overlay > h2').innerHTML = `${text}`;
        document.querySelector('#overlay > h3').innerHTML = `Select a chart`;
    }
    clearOverlay = () => {
        document.querySelector('#overlay').style.display = 'none';
        this.output.style.display = 'block';
    }
    showOverlay = () => {
        document.querySelector('#overlay').style.display = 'block';
        this.output.style.display = 'none';
    }

    selectChart = id => {
        this.#dataButtons.forEach((e, index) => {
            if (index == id) {
                e.classList.add('active-chart-button');
            } else {
                e.classList.remove('active-chart-button');
            }
        });
        console.log(id);
        this.annotationFields.forEach((f, index) => {
            if (id === index) {
                f.style.display = 'block';
            } else {
                f.style.display = 'none';
            }
        });
    }
    toggleMenu = id => {
        this.#menus.forEach((m, index) => {
            m.e.style.height = id === index ? m.maxHeight : '0px';
        });
    }

    displayProjectDetails = () => {
        document.querySelector('#project-details-popup').style.display = 'block';
    };

    hideProjectDetails = () => {
        document.querySelector('#project-details-popup').style.display = 'none';
    }
}