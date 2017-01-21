'use strict'

const FILE = '/pdf/CS2100.pdf'
const PAGE = 1

const canvas = document.getElementById('pdf')
const context = canvas.getContext('2d')

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8

function renderPage(num) {
    pageRendering = true;

    pdfDoc.getPage(num) .then(page => {
        const viewport = page.getViewport(scale)
        canvas.height = viewport.height
        canvas.width = viewport.width

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        }
        const renderTask = page.render(renderContext)

        renderTask.promise.then(() => {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending)
                pageNumPending = null;
            }
        })
    })
}

function queueRenderPage(num) {
    if (pageRendering)
        pageNumPending = num
    else
        renderPage(num)
}

function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--
    queueRenderPage(pageNum)
}

function onNextPage() {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++
    queueRenderPage(pageNum)
}

canvas.onclick = e => {
    const x = e.layerX / canvas.width
    if (x < 0.3) onPrevPage()
    else if (x > 0.7) onNextPage()
}

PDFJS.getDocument(FILE)
    .then(_pdfDoc => {
        pdfDoc = _pdfDoc
        renderPage(pageNum)
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
