import PDFDocument from 'pdfkit'
import StockModel from '../../../models/productManagementModels/StockModel.js'
import StockProducts from '../../../models/productManagementModels/StockProductsModel.js'

// This controller generates a Supplier and Stocks Report
const GenerateSupplierStockReport = async (req, res) => {
    try {
        // Retrieve all stocks and populate the Supplier field
        const stocks = await StockModel.find().populate('Supplier')

        // Group stocks by supplier
        const supplierData = {}
        // Loop over each stock entry
        for (const stock of stocks) {
            // Get supplier id and ensure a valid value
            const supplierId = stock.Supplier?._id.toString() || 'Unknown'
            // Initialize supplier grouping if not already set
            if (!supplierData[supplierId]) {
                supplierData[supplierId] = {
                    supplier: stock.Supplier,
                    stocks: [],
                    totalStockValue: 0,
                    totalQuantity: 0,
                }
            }

            // Retrieve the stock products associated with this stock entry
            const stockProducts = await StockProducts.find({ stock: stock._id }).populate('product')

            // Calculate the aggregate value and quantity for this stock entry
            let stockValue = 0
            let stockQuantity = 0
            stockProducts.forEach(item => {
                stockValue += item.price * item.quantity
                stockQuantity += item.quantity
            })

            // Store stock entry details
            supplierData[supplierId].stocks.push({
                stock,
                stockProducts,
                stockValue,
                stockQuantity,
            })
            // Update supplier-level aggregates
            supplierData[supplierId].totalStockValue += stockValue
            supplierData[supplierId].totalQuantity += stockQuantity
        }

        // Create a new PDF document
        const doc = new PDFDocument({ margin: 50 })

        // Setup response headers for a downloadable PDF file
        res.setHeader('Content-disposition', 'attachment; filename="supplier-stock-report.pdf"')
        res.setHeader('Content-type', 'application/pdf')
        doc.pipe(res)

        // Report Header
        doc.fontSize(20).text('Supplier and Stocks Report', { align: 'center' })
        doc.moveDown()
        doc.fontSize(12).text(`Report generated on: ${new Date().toLocaleString()}`)
        doc.moveDown(2)

        // Iterate over each supplier in the grouping
        for (const supplierId in supplierData) {
            const data = supplierData[supplierId]
            const supplier = data.supplier

            // Supplier Overview
            doc.fontSize(16).text(`Supplier: ${supplier?.name || 'Unknown Supplier'}`, { underline: true })
            doc.fontSize(12)
            doc.text(`Total Stocks Provided: ${data.stocks.length}`)
            doc.text(`Total Stock Value: Rs.${data.totalStockValue.toFixed(2)}`)
            doc.text(`Total Quantity of Items: ${data.totalQuantity}`)
            doc.moveDown()

            // Loop through each stock entry for this supplier
            data.stocks.forEach((stockEntry, index) => {
                doc.fontSize(14).text(`Stock Entry ${index + 1}`, { underline: true })
                doc.fontSize(12)
                doc.text(`Stock ID: ${stockEntry.stock._id}`)
                doc.text(`Created At: ${new Date(stockEntry.stock.CreatedAt).toLocaleString()}`)
                doc.text(`Stock Value: Rs.${stockEntry.stockValue.toFixed(2)}`)
                doc.text(`Total Quantity: ${stockEntry.stockQuantity}`)
                doc.moveDown()

                // List item-wise details for each stock entry
                stockEntry.stockProducts.forEach((item, i) => {
                    doc.fontSize(12).text(`- Item ${i + 1}: ${item.product?.name || 'Unknown Product'}`)
                    doc.text(`  Description: ${item.product?.description || 'No Description'}`)
                    doc.text(`  Quantity: ${item.quantity}`)
                    doc.text(`  Price per Unit: Rs.${item.price}`)
                    doc.text(`  Total Value: Rs.${(item.price * item.quantity).toFixed(2)}`)
                    doc.text(`  Manufacture Date: ${new Date(item.manufactureDate).toLocaleDateString()}`)
                    doc.text(`  Expiration Date: ${new Date(item.expirationDate).toLocaleDateString()}`)
                    // Low stock alert if quantity is less than 20
                    if (item.quantity < 20) {
                        doc.fillColor('red').text(`Low Stock Alert: Only ${item.quantity} left!`)
                        doc.fillColor('black')
                    }
                    doc.moveDown(0.5)
                })
                doc.moveDown()
            })

            // Optional: Add a new page for each supplier if needed
            doc.addPage()
        }

        // Finalize the PDF document
        doc.end()
    } catch (error) {
        console.error('Error generating supplier stock report:', error)
        res.status(500).json({ error: 'An error occurred while generating the supplier stock report.' })
    }
}

export default GenerateSupplierStockReport