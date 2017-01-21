'use strict'

const FILE = '/pdf/CS2100.pdf'
const PAGE = 1

const canvas = document.getElementById('pdf')
const context = canvas.getContext('2d')

PDFJS.getDocument(FILE)
    .then(pdf => pdf.getPage(PAGE))
    .then(page => {
        const scale = 1
        const viewport = page.getViewport(scale)

        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        page.render(renderContext)
    })

const socket = io();

const chatDOM = document.getElementById('chat')
chatDOM.onkeypress = e => {
    if (e.keyCode == 13) {
        const message = chatDOM.value

        console.log(message)
        socket.emit('message', message)
    }
}
