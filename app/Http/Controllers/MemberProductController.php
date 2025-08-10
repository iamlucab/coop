<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class MemberProductController extends Controller
{
    /**
     * Display a listing of active and in-stock products.
     */
    public function index(Request $request)
    {
        $query = Product::where('active', 1)->where('stock_quantity', '>', 0);

        // Optional: search filter
        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Category filtering
        if ($categoryId = $request->input('category')) {
            $query->where('category_id', $categoryId);
        }

        $products = $query->latest()->paginate(12);
        
        // Get all categories for filtering
        $categories = \App\Models\Category::orderBy('name')->get();
        
        // Calculate additional variables needed by the view
        $totalProducts = Product::where('active', 1)->where('stock_quantity', '>', 0)->count();
        $hasMore = $products->hasMorePages();

        return view('shop.index', compact('products', 'categories', 'hasMore', 'totalProducts'));
    }

    /**
     * Show the details of a single product.
     */
    public function show(Product $product)
    {
        if (!$product->active || $product->stock_quantity <= 0) {
            abort(404);
        }

        return view('shop.show', compact('product'));
    }
}
