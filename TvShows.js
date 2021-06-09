const box = document.querySelector('.resultContainer')
const errorPage = document.querySelector('.errorPage')



const search = document.querySelector('#search')
search.addEventListener('submit', async function (e) {


    e.preventDefault()
    $(".resultContainer").empty();

    var value = search.elements[0].value
    const result = fetch(`http://api.tvmaze.com/search/shows?q=${value}`)

    result.then((response) => { return response.json() })
        .then(async (data) => {
            search.reset()
            console.log(data)
            await createCard(data)
        }).catch((error) => {
            console.log(error)
            box.innerHTML = '<h1 style="text-align: center;">OOPs!</h1> <h1 style="text-align: center;">Something went Wrong</h1>'

        })




})

async function createCard(shows) {
    const h1 = document.createElement('h1')
    h1.innerHTML = `${shows.length} Results Found <hr>`
    box.append(h1)
    for (let result of shows) {

        if (result.show.image) {

            const card = document.createElement('div')
            card.classList.add('row')
            card.classList.add('no-gutters')
            card.classList.add('m-3')
            card.classList.add('CardLarge')



            const imageBody = document.createElement('div')
            imageBody.style.width = '40%'
            const image = document.createElement('img')
            image.src = result.show.image.medium
            imageBody.append(image)
            card.append(imageBody)

            const cardBodyContainer = document.createElement('div')
            cardBodyContainer.style.width = '60%'

            const cardbody = document.createElement('div')
            cardbody.classList.add('card-body')
            cardbody.style.padding = '0px'

            h5 = document.createElement('h3')
            h5.classList.add('card-title')
            h5.classList.add('m-4')
            h5.style.textAlign = 'center'
            h5.innerHTML = result.show.name
            cardbody.append(h5)

            const cardText = document.createElement('div')
            cardText.classList.add('card-text')
            cardText.style.textAlign = 'center'
            cardText.innerHTML = `  <h5 style=>Language - ${result.show.language} </h5>
                                    <h5>Premeired - ${result.show.premiered} </h5>
                                    <h5>Genre - ${result.show.genres[0]} </h5>`
            cardbody.append(cardText)

            const anchor = document.createElement('a')
            anchor.classList.add('btn')
            anchor.classList.add('btn-primary')
            anchor.innerHTML = "Know More"
            anchor.href = result.show.url
            anchor.style.marginLeft = '30%'
            cardbody.append(anchor)

            cardBodyContainer.append(cardbody)
            card.append(cardBodyContainer)

            box.append(card)
        }
    }
}