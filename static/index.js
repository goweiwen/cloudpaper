'use strict'

class PDFDoc {
    constructor(url, page) {
        this.url = url
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)
        this.context = this.canvas.getContext('2d')

        this.pdfDoc = null
        this.pageNum = page != null ? page : 1
        this.pageRendering = false
        this.pageNumPending = null
        this.scale = 0.8

        this.canvas.onclick = e => {
            const x = e.layerX / this.canvas.width
            if (x < 0.3) this.onPrevPage()
            else if (x > 0.7) this.onNextPage()
        }

        PDFJS.getDocument(this.url)
            .then(_pdfDoc => {
                this.pdfDoc = _pdfDoc
                this.renderPage(this.pageNum)
            })
    }

    renderPage(num) {
        this.pageRendering = true;

        this.pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport(this.scale)
            this.canvas.height = viewport.height
            this.canvas.width = viewport.width

            const renderContext = {
                canvasContext: this.context,
                viewport: viewport
            }
            const renderTask = page.render(renderContext)

            renderTask.promise.then(() => {
                this.pageRendering = false;
                if (this.pageNumPending !== null) {
                    this.renderPage(this.pageNumPending)
                    this.pageNumPending = null;
                }
            })
        })
    }

    queueRenderPage(num) {
        if (this.pageRendering)
            this.pageNumPending = num
        else
            this.renderPage(num)
    }

    onPrevPage() {
        if (this.pageNum <= 1) return;
        this.pageNum--
        this.queueRenderPage(this.pageNum)
    }

    onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) return;
        this.pageNum++
        this.queueRenderPage(this.pageNum)
    }
}

const CS2100 = new PDFDoc('/pdf/CS2100.pdf')
