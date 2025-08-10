<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Unit;
use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of products created by the current staff user.
     */
    public function index(Request $request)
    {
        $selectedCategoryId = $request->input('category_id');

        $query = Product::with('category')
            ->where('created_by', Auth::user()->id);
            
        if ($selectedCategoryId) {
            $query->where('category_id', $selectedCategoryId);
        }

        return view('staff.products.index', [
            'products' => $query->get(),
            'categories' => Category::all(),
            'selectedCategoryId' => $selectedCategoryId,
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        $discountValues = json_decode(Setting::get('discount_values', '[]'), true);
        $promoCodes = json_decode(Setting::get('promo_codes', '[]'), true);
        $sizes = json_decode(Setting::get('available_sizes', '[]'), true);
        $colors = json_decode(Setting::get('available_colors', '[]'), true);

        $categories = Category::all();
        $units = Unit::all();

        return view('staff.products.create', compact(
            'discountValues',
            'promoCodes',
            'sizes',
            'colors',
            'categories',
            'units'
        ));
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'cashback_amount' => 'required|numeric|min:0',
            'cashback_max_level' => 'required|integer|min:1|max:11',
            'cashback_level_bonuses' => 'nullable|array',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'thumbnail' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
            'attributes' => 'nullable|string|in:S,M,L, XL, XXL, Corner, Round, Red, Blue, Green, Yellow, Black, White, Others',
            'discount_value' => 'nullable|numeric|min:0',
            'discount_type' => 'nullable|in:flat,percent',
            'promo_code' => 'nullable|string|max:50',
        ]);
        
        // Convert cashback_level_bonuses to proper format if provided
        if ($request->has('cashback_level_bonuses')) {
            $levelBonuses = [];
            foreach ($request->cashback_level_bonuses as $level => $amount) {
                if (!empty($amount)) {
                    $levelBonuses[$level] = (float) $amount;
                }
            }
            $validated['cashback_level_bonuses'] = $levelBonuses;
        }

        // Handle possible array for attributes
        if (is_array($validated['attributes'] ?? null)) {
            $validated['attributes'] = $validated['attributes'][0];
        }

        // Set the created_by field to current user
        $validated['created_by'] = Auth::user()->id;

        // Create product
        $product = new Product($validated);

        // Handle thumbnail
        if ($request->hasFile('thumbnail')) {
            $product->thumbnail = $request->file('thumbnail')->store('products/thumbnails', 'public');
        }

        // Handle gallery
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $image) {
                $galleryPaths[] = $image->store('products/gallery', 'public');
            }

            // Reorder based on gallery_order
            if ($request->filled('gallery_order')) {
                $order = json_decode($request->gallery_order, true);
                $galleryPaths = collect($order)->map(fn($i) => $galleryPaths[$i] ?? null)->filter()->values()->all();
            }

            $product->gallery = json_encode($galleryPaths);
        }

        $product->save();

        return redirect()->route('staff.products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product (only if created by current staff user).
     */
    public function show(Product $product)
    {
        // Get the actual user ID from the authenticated user
        $currentUserId = Auth::user()->id;
        
        // Check if the product belongs to the current staff user
        if ($product->created_by !== $currentUserId) {
            abort(403, 'You can only view products you created.');
        }

        return view('staff.products.show', compact('product'));
    }

    /**
     * Show the form for editing the specified product (only if created by current staff user).
     */
    public function edit(Product $product)
    {
        // Check if the product belongs to the current staff user
        if ($product->created_by !== Auth::user()->id) {
            abort(403, 'You can only edit products you created.');
        }

        $categories = Category::all();
        $units = Unit::all();
        
        return view('staff.products.edit', compact('product', 'categories', 'units'));
    }

    /**
     * Update the specified product in storage (only if created by current staff user).
     */
    public function update(Request $request, Product $product)
    {
        // Check if the product belongs to the current staff user
        if ($product->created_by !== Auth::user()->id) {
            abort(403, 'You can only edit products you created.');
        }

        $validated = $request->validate([
            'name'                  => 'required|string|max:255',
            'description'           => 'nullable|string',
            'price'                 => 'required|numeric|min:0',
            'cashback_amount'       => 'required|numeric|min:0',
            'cashback_max_level'    => 'required|integer|min:1|max:11',
            'cashback_level_bonuses' => 'nullable|array',
            'stock_quantity'        => 'required|integer|min:0',
            'category_id'           => 'required|exists:categories,id',
            'unit_id'               => 'required|exists:units,id',
            'thumbnail'             => 'nullable|image|max:2048',
            'gallery.*'             => 'nullable|image|max:2048',
            'attributes'            => 'nullable|string|in:S,M,L,XL,XXL,Corner,Round,Red,Blue,Green,Yellow,Black,White,Others',
            'discount_value'        => 'nullable|numeric|min:0',
            'discount_type'         => 'nullable|in:flat,percent',
            'promo_code'            => 'nullable|string|max:50',
        ]);
        
        // Convert cashback_level_bonuses to proper format if provided
        if ($request->has('cashback_level_bonuses')) {
            $levelBonuses = [];
            foreach ($request->cashback_level_bonuses as $level => $amount) {
                if (!empty($amount)) {
                    $levelBonuses[$level] = (float) $amount;
                }
            }
            $validated['cashback_level_bonuses'] = $levelBonuses;
        }

        // Update core fields
        $product->fill($validated);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $product->thumbnail = $request->file('thumbnail')->store('products/thumbnails', 'public');
        }

        // Handle gallery upload
        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $image) {
                $galleryPaths[] = $image->store('products/gallery', 'public');
            }

            $product->gallery = json_encode($galleryPaths);
        }

        $product->save();

        return redirect()->route('staff.products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage (only if created by current staff user).
     */
    public function destroy(Product $product)
    {
        // Check if the product belongs to the current staff user
        if ($product->created_by !== Auth::user()->id) {
            abort(403, 'You can only delete products you created.');
        }

        $product->delete();
        return redirect()->route('staff.products.index')->with('success', 'Product deleted.');
    }
    
    /**
     * Preview cashback distribution based on provided parameters.
     */
    public function previewCashback(Request $request)
    {
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
    }
    
    /**
     * Toggle the active status of a product (only if created by current staff user).
     */
    public function toggleStatus(Product $product)
    {
        // Check if the product belongs to the current staff user
        if ($product->created_by !== Auth::user()->id) {
            abort(403, 'You can only modify products you created.');
        }

        $product->active = !$product->active;
        $product->save();

        $status = $product->active ? 'activated' : 'deactivated';
        
        return redirect()->back()->with('success', "Product has been {$status} successfully.");
    }
}