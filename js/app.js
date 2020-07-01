window.onload = function () {
    const container = document.getElementById('carousel-container')

    let nroItems = 0,
        itemsList = [],
        timeout = 2000,
        currentItem = 0,
        intervalo

    const eventDot = () => {
        // Obtiene todos los puntos para luego calcular la posición en que se dio click
        const dots = Array.from(container.querySelectorAll('.carousel__dot'))

        // Escucha el evento click para los controles
        container.addEventListener('click', e => {
            e.stopPropagation()

            // Solo si se da click en el punto
            if(e.target.classList.contains('carousel__dot')) {

                // Calcula el ínidice del punto donde se dio click
                let calcIndex = dots.indexOf(e.target)

                itemsList.forEach((item, index) => {
                    if(index != calcIndex) {
                        if(item.classList.contains('carousel__item--active')) {
                            item.classList.remove('carousel__item--active')
                        }
                    }
                })

                // Limpia el setInterval anterior
                window.clearInterval(intervalo);

                // zIndex++

                currentItem = calcIndex

                itemsList[currentItem].classList.add('carousel__item--active')

                setIntervalo()

            }
        })
    }

    const renderNroItems = () => {
        // Contenedor de los dots
        let dotsContainer = container.querySelector('.carousel__dots-container')

        // Crea un dot por cada item
        for (let i = 0; i < nroItems; i++) {

            // Cada punto del carousel
            let span = document.createElement('span')
            span.classList.add('carousel__dot')

            dotsContainer.appendChild(span)
        }
    }

    const changeItem = () => {
        let zIndex = 10

        if(currentItem < (itemsList.length - 1)) {
            currentItem++
        } else {
            // Si no hay items limpia resetea datos
            itemsList.forEach((item, index) => {
                item.classList.remove('carousel__item--active')
            })

            currentItem = 0
        }

        itemsList[currentItem].style.zIndex = zIndex
        itemsList[currentItem].classList.add('carousel__item--active')

    }

    const setIntervalo = () => {
        intervalo = setInterval(changeItem, timeout);
    }

    const getItems = () => {
        // Obtener items
        let items = Array.from(container.querySelectorAll('.carousel__item'))

        nroItems = items.length
        itemsList = items

        renderNroItems()

        eventDot() 

        itemsList[currentItem].classList.add('carousel__item--active')

        // Se envía 0 como item inicial y 10 para el z-index del css
        setIntervalo()
    }


    getItems()

}