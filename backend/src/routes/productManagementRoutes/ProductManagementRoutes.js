import axios from 'axios'
import express from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../../controllers/productManagementControllers/Category.js'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../../controllers/productManagementControllers/Product.js'
import { createSupplier, getSuplierById, getAllSuppliers, updateSupplier, deleteSupplier } from '../../controllers/productManagementControllers/Suplier.js'
import { createStock, getStockById, getAllStocks, updateStock, deleteStock, removeProductsFromStock, addProductsToStock } from '../../controllers/productManagementControllers/Stock.js'
import { searchProducts, searchSuppliers } from '../../controllers/productManagementControllers/fetch/Search.js'

const router = express.Router()

//Category routes
router.post('/category', createCategory)
router.get('/category/:id', getCategoryById)
router.get('/category', getAllCategories)
router.put('/category', updateCategory)
router.delete('/category', deleteCategory)

//Product routes
router.post('/product', createProduct)
router.get('/product/:id', getProductById)
router.get('/product', getAllProducts)
router.put('/product', updateProduct)
router.delete('/product', deleteProduct)

//Supplier routes
router.post('/suplier', createSupplier)
router.get('/suplier/:id', getSuplierById)
router.get('/suplier', getAllSuppliers)
router.put('/suplier', updateSupplier)
router.delete('/suplier', deleteSupplier)

//Stock routes
router.post('/stock', createStock)
router.get('/stock/:id', getStockById)
router.get('/stock', getAllStocks)
router.put('/stock', updateStock)
router.delete('/stock', deleteStock)
router.post('/stock/product', addProductsToStock)
router.delete('/stock/product', removeProductsFromStock)

//Search query routes
router.get('/product/q', searchProducts)
router.get('/supplier/q', searchSuppliers)


export default router