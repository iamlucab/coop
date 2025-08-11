<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of products for staff.
     */
    public function index()
    {
        $user = auth()->user();
        $products = Product::where('created_by', $user->id)->with('category')->paginate(10);
        return view('staff.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $categories = Category::all();
        $units = \App\Models\Unit::all();
        $discountValues = json_decode(\App\Models\Setting::get('discount_values', '[]'));
        $promoCodes = json_decode(\App\Models\Setting::get('promo_codes', '[]'));
        $sizes = json_decode(\App\Models\Setting::get('available_sizes', '[]'));
        $colors = json_decode(\App\Models\Setting::get('available_colors', '[]'));
        
        return view('staff.products.create', compact('categories', 'units', 'discountValues', 'promoCodes', 'sizes', 'colors'));
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'category_id' => 'required|exists:categories,id',
                'stock_quantity' => 'required|integer|min:0',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',

                'active' => 'boolean',
                'discount_value' => 'nullable|numeric|min:0',
                'discount_type' => 'nullable|in:flat,percent',
                'promo_code' => 'nullable|string|max:50',
                'cashback_amount' => 'required|numeric|min:0',
                'cashback_max_level' => 'required|integer|min:1|max:11',
                'cashback_level_bonuses' => 'nullable|array',
                'cashback_level_bonuses.*' => 'nullable|numeric|min:0',
            ]);

            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                $thumbnailPath = $request->file('thumbnail')->store('products/thumbnails', 'public');
                $validated['thumbnail'] = $thumbnailPath;
            }
            
            // Handle gallery uploads
            if ($request->hasFile('gallery')) {
                $galleryPaths = [];
                foreach ($request->file('gallery') as $image) {
                    $galleryPaths[] = $image->store('products/gallery', 'public');
                }
                
                // Reorder based on gallery_order if provided
                if ($request->filled('gallery_order')) {
                    $order = json_decode($request->gallery_order, true);
                    $galleryPaths = collect($order)->map(fn($i) => $galleryPaths[$i] ?? null)->filter()->values()->all();
                }
                
                $validated['gallery'] = json_encode($galleryPaths);
            }

            // Set the creator of the product
            $validated['created_by'] = auth()->id();
            $validated['active'] = $request->has('active') ? 1 : 0;

            Product::create($validated);

            return redirect()->route('staff.products.index')
                ->with('success', 'Product created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }
    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        // Ensure staff can only view their own products
        if ($product->created_by != auth()->id()) {
            abort(403, 'Unauthorized access to product.');
        }
        
        return view('staff.products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        // Ensure staff can only edit their own products
        if ($product->created_by != auth()->id()) {
            abort(403, 'Unauthorized access to product.');
        }
        
        $categories = Category::all();
        $units = \App\Models\Unit::all();
        return view('staff.products.edit', compact('product', 'categories', 'units'));
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Ensure staff can only update their own products
        if ($product->created_by != auth()->id()) {
            abort(403, 'Unauthorized access to product.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'stock_quantity' => 'required|integer|min:0',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'active' => 'boolean',

            'discount_value' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|in:flat,percent',

            'promo_code' => 'nullable|string|max:50',
            'cashback_amount' => 'required|numeric|min:0',
            'cashback_max_level' => 'required|integer|min:1|max:11',
            'cashback_level_bonuses' => 'nullable|array',
            'cashback_level_bonuses.*' => 'nullable|numeric|min:0',
        ]);

        try {
            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if exists
                if ($product->thumbnail) {
                    Storage::disk('public')->delete($product->thumbnail);
                }
                
                $thumbnailPath = $request->file('thumbnail')->store('products/thumbnails', 'public');
                $validated['thumbnail'] = $thumbnailPath;
            }
            
            // Handle gallery uploads
            if ($request->hasFile('gallery')) {
                // Delete old gallery images if they exist
                if ($product->gallery) {
                    foreach (json_decode($product->gallery, true) as $oldImage) {
                        Storage::disk('public')->delete($oldImage);
                    }
                }
                
                $galleryPaths = [];
                foreach ($request->file('gallery') as $image) {
                    $galleryPaths[] = $image->store('products/gallery', 'public');
                }
                
                // Reorder based on gallery_order if provided
                if ($request->filled('gallery_order')) {
                    $order = json_decode($request->gallery_order, true);
                    $galleryPaths = collect($order)->map(fn($i) => $galleryPaths[$i] ?? null)->filter()->values()->all();
                }
                
                $validated['gallery'] = json_encode($galleryPaths);
            }

            $validated['active'] = $request->has('active') ? 1 : 0;

            $product->update($validated);

            return redirect()->route('staff.products.index')
                ->with('success', 'Product updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        // Ensure staff can only delete their own products
        if ($product->created_by != auth()->id()) {
            abort(403, 'Unauthorized access to product.');
        }
        
        try {
            
            // Delete thumbnail if exists
            if ($product->thumbnail) {
                Storage::disk('public')->delete($product->thumbnail);
            }

            $product->delete();

            return redirect()->route('staff.products.index')
                ->with('success', 'Product deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }
    
    /**
     * Toggle product status (active/inactive)
     */
    public function toggleStatus(Product $product)
    {
        // Ensure staff can only toggle status of their own products
        if ($product->created_by != auth()->id()) {
            abort(403, 'Unauthorized access to product.');
        }
        
        try {
            
            $product->update(['active' => !$product->active]);
            
            $status = $product->active ? 'activated' : 'deactivated';
            
            return redirect()->route('staff.products.index')
                ->with('success', "Product {$status} successfully.");
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Failed to toggle product status: ' . $e->getMessage());
        }
    }
    
    /**
     * Preview cashback distribution based on provided parameters.
     */
    public function previewCashback(Request $request)
    {
        try {
            $cashbackAmount = $request->input('cashback_amount', 0);
            $maxLevel = $request->input('cashback_max_level', 1);
            $levelBonuses = $request->input('cashback_level_bonuses', []);
            
            // Create a temporary product for preview
            $product = new Product([
                'cashback_amount' => $cashbackAmount,
                'cashback_max_level' => $maxLevel,
                'cashback_level_bonuses' => $levelBonuses,
            ]);
            
            $cashbacks = $product->getAllCashbacks();
            
            return response()->json([
                'cashbacks' => $cashbacks,
                'total' => array_sum($cashbacks),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to preview cashback: ' . $e->getMessage()
            ], 500);
        }
    }
}