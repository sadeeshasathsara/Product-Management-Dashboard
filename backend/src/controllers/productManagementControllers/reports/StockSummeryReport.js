import PDFDocument from 'pdfkit'
import StockProducts from '../../../models/productManagementModels/StockProductsModel.js'

export const StockSummaryReport = async (req, res) => {
    try {
        // Fetch stock product data with product details
        const stockProducts = await StockProducts.find().populate('product')

        // Calculate stock overview
        let totalStockValue = 0
        let totalQuantityAvailable = 0
        const uniqueItems = new Set()

        stockProducts.forEach(item => {
            totalStockValue += item.price * item.quantity
            totalQuantityAvailable += item.quantity
            uniqueItems.add(item.product?._id.toString()) // Ensure uniqueness
        })

        const totalUniqueItems = uniqueItems.size

        // Create a new PDF document
        const doc = new PDFDocument({ margin: 50 })

        // Set response headers for PDF download
        res.setHeader('Content-disposition', 'attachment; filename="stock-summary-report.pdf"')
        res.setHeader('Content-type', 'application/pdf')

        // Pipe PDF to response
        doc.pipe(res)

        // Report Title
        doc.fontSize(20).text('Stock Summary Report', { align: 'center' })
        doc.moveDown()
        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`)
        doc.moveDown(2)

        // Stock Overview Section
        doc.fontSize(16).text('Stock Overview', { underline: true })
        doc.moveDown()
        doc.fontSize(12).text(`Total Stock Value: Rs.${totalStockValue.toFixed(2)}`)
        doc.text(`Total Unique Items: ${totalUniqueItems}`)
        doc.text(`Total Quantity Available: ${totalQuantityAvailable}`)
        doc.moveDown(2)

        // Item-wise Stock Details Section
        doc.fontSize(16).text('Item-Wise Stock Details', { underline: true })
        doc.moveDown()

        stockProducts.forEach((item, index) => {
            doc.fontSize(14).text(`Item ${index + 1}`, { underline: true })
            doc.fontSize(12).text(`Product Name: ${item.product?.name || 'Unknown'}`)
            doc.text(`Description: ${item.product?.description || 'No Description'}`)
            doc.text(`Quantity Available: ${item.quantity}`)
            doc.text(`Price per Unit: Rs.${item.price}`)
            doc.text(`Total Value: Rs.${(item.quantity * item.price).toFixed(2)}`)
            doc.text(`Manufacture Date: ${new Date(item.manufactureDate).toLocaleDateString()}`)
            doc.text(`Expiration Date: ${new Date(item.expirationDate).toLocaleDateString()}`)
            doc.moveDown()
        })

        // Low Stock Alerts Section
        const lowStockItems = stockProducts.filter(item => item.quantity < 20)

        if (lowStockItems.length > 0) {
            doc.fontSize(16).text('Low Stock Alerts (Less than 20 items)', { underline: true, color: 'red' })
            doc.moveDown()

            lowStockItems.forEach((item, index) => {
                doc.fontSize(12).text(`${index + 1}. ${item.product?.name || 'Unknown'} - Only ${item.quantity} left!`)
            })
            doc.moveDown(2)
        }

        // Finalize PDF
        doc.end()
    } catch (error) {
        console.error('Error generating stock report:', error)
        res.status(500).json({ error: 'An error occurred while generating the stock report.' })
    }
}

export default StockSummaryReport