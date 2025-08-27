// Mapeia os elementos do HTML que serão manipulados pelo JavaScript.
const button = document.getElementById('convert-button')
const currencySelectFrom = document.getElementById('currency-select-from')
const currencySelectTo = document.getElementById('currency-select-to')

// Função principal que realiza a conversão dos valores.
const convertValues = async () => {

    // Captura o valor digitado pelo usuário e os elementos onde os resultados serão exibidos.
    const inputReais = document.getElementById('input-real').value
    const realValueText = document.getElementById('currency-value-text-from')
    const currencyValueText = document.getElementById('currency-value-text-to')

    // Busca os dados de cotação atualizados de uma API externa de forma assíncrona.
    const data = await fetch( "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then(response => response.json())

    // Extrai os valores específicos de cada moeda da resposta da API.
    const dollar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high

    // Formata o valor de entrada para o padrão de moeda brasileira (BRL) e o exibe na tela.
    realValueText.innerHTML = new Intl.NumberFormat("pt-BR",
        {
            style: "currency",
            currency: "BRL",
        }).format(inputReais)
        
        // Verifica qual moeda de destino foi selecionada e realiza o cálculo de conversão correspondente.
        if (currencySelectTo.value === "US$ Dólar Americano") {
            currencyValueText.innerHTML = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(inputReais / dollar)
        }

        if (currencySelectTo.value === "€ Euro") {
            currencyValueText.innerHTML = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(inputReais / euro)
        }

        if (currencySelectTo.value === "₿ Bitcoin") {
    currencyValueText.innerHTML = (inputReais / bitcoin).toFixed(5)
        }

}

// Função que altera a exibição da moeda de ORIGEM 
const changeCurrencyFrom = () => {

    // Captura os elementos da seção "de" (from) para serem alterados.
    const currencyNameFrom = document.getElementById('currency-name-from')
    const currencyImgFrom = document.getElementById('currency-img-from')
    const currencyValueTextFrom = document.getElementById('real-value-text-from')

    // Altera o nome, a imagem e o valor da moeda de origem na interface.
    if (currencySelectFrom.value === 'R$ Real Brasileiro') {
        currencyNameFrom.innerHTML = 'Real'
        currencyImgFrom.src = 'assets/brasil 2.png'
        currencyValueTextFrom.innerHTML = 'R$ 0,00'
    }
}

// Função que altera a exibição da moeda de DESTINO.
const changeCurrencyTo = () => {

    // Captura os elementos da seção "para" (to) para serem alterados.
    const currencyNameTo = document.getElementById('currency-name-to')
    const currencyImgTo = document.getElementById('currency-img-to')
    const currencyValueTextTo = document.getElementById('currency-value-text-to')

    // Verifica a moeda selecionada e atualiza o nome, a imagem e o valor correspondente na interface.
    if (currencySelectTo.value === 'US$ Dólar Americano') {
        currencyNameTo.innerHTML = 'Dollar'
        currencyImgTo.src = 'assets/estados-unidos (1) 1.png'
        currencyValueTextTo.innerHTML = 'US$ 0,00'
    }

    if (currencySelectTo.value === '€ Euro') {
        currencyNameTo.innerHTML = 'Euro'
        currencyImgTo.src = 'assets/euro.png'
        currencyValueTextTo.innerHTML = '€ 0,00'
    }

    if (currencySelectTo.value === '₿ Bitcoin') {
        currencyNameTo.innerHTML = "Bitcoin"
        currencyImgTo.src = "assets/BTC.png"
        currencyValueTextTo.innerHTML = '₿ 0.00'
    }

    // Chama a função de conversão para atualizar o cálculo imediatamente após a troca de moeda.
    convertValues()
}


// Adiciona "escutadores" de eventos que disparam as funções quando o usuário interage com a página.
button.addEventListener('click', convertValues)
currencySelectFrom.addEventListener('change', changeCurrencyFrom)

currencySelectTo.addEventListener('change', changeCurrencyTo)
