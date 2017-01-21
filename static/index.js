'use strict'

class PDFDoc {
    constructor(id, url, page) {
        this.id = id
        this.url = url

        this.canvas = document.createElement('canvas')
        this.canvas.style.position = 'fixed'
        document.body.appendChild(this.canvas)
        this.context = this.canvas.getContext('2d')

        this.pdfDoc = null
        this.pageNum = page != null ? page : 1
        this.pageRendering = false
        this.pageNumPending = null
        this.scale = 1

        this.x = 0
        this.y = 0

        this.canvas.onclick = e => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / this.canvas.width
            if (x < 0.3) this.onPrevPage()
            else if (x > 0.7) this.onNextPage()
        }

        PDFJS.getDocument(this.url)
            .then(_pdfDoc => {
                this.pdfDoc = _pdfDoc
                this.renderPage(this.pageNum)
            })
    }

    setPosition(x, y) {
        this.x = x
        this.y = y

        this.canvas.style.left = `${x} px`
        this.canvas.style.top = `${y} px`
    }

    setSocket(socket) {
        this.socket = socket
        socket.on('pdf page', (data) => {
            const {id, num} = data
            if (id == this.id) this.queueRenderPage(num)
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

        if (socket) socket.emit('pdf page', {
            id: this.id,
            num: this.pageNum
        })

        this.queueRenderPage(this.pageNum)
    }

    onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) return;
        this.pageNum++

        if (socket) socket.emit('pdf page', {
            id: this.id,
            num: this.pageNum
        })

        this.queueRenderPage(this.pageNum)
    }
}

// const CS2100 = new PDFDoc('/pdf/CS2100.pdf')
// CS2100.setSocket(socket)
