'use strict'

const FILE = '/pdf/CS2100.pdf'
const PAGE = 2

PDFJS.getDocument(FILE)
    .then(pdf => pdf.getPage(PAGE))
    .then(page => {
        const scale = 1
        const viewport = page.getViewport(scale)

        const canvas = document.getElementById('pdf')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        page.render(renderContext)
    })

const socket = io();

document.getElementById('button').onclick = () => socket.emit('message', 'HI!!!')
