@extends('adminlte::page')
<meta name="csrf-token" content="{{ csrf_token() }}">
@section('title', 'Order Reports')

@section('content')
<div class="container-fluid">
    <div class="card rounded-3 shadow-sm">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Order Reports</h5>
        </div>

        <div class="card-body">

            {{-- Filter Form --}}
            <form method="GET" class="mb-4">
                <div class="row">
                    <div class="col-md-3">
                        <label>From Date</label>
                        <input type="date" name="from" value="{{ request('from') }}" class="form-control form-control-sm">
                    </div>
                    <div class="col-md-3">
                        <label>To Date</label>
                        <input type="date" name="to" value="{{ request('to') }}" class="form-control form-control-sm">
                    </div>
                    <div class="col-md-3">
                        <label>Status</label>
                        <select name="status" class="form-control form-control-sm">
                            <option value="">-- All Status --</option>
                            @foreach(['Pending','Processing','On the Way','Delivered'] as $status)
                                <option value="{{ $status }}" {{ request('status') == $status ? 'selected' : '' }}>{{ $status }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>Member Name or Mobile</label>
                        <input type="text" name="member" value="{{ request('member') }}" class="form-control form-control-sm" placeholder="Search...">
                    </div>
                </div>
                <div class="text-right mt-2">
                    <button type="submit" class="btn btn-sm btn-success"><i class="bi bi-funnel"></i> Filter</button>
                    <a href="{{ route('admin.orders.index') }}" class="btn btn-sm btn-secondary">Reset</a>
                </div>
            </form>

            {{-- Chart --}}
            <canvas id="salesChart" height="20"></canvas>

            {{-- Orders Table --}}
            <div class="table-responsive mt-4">
                <table class="table table-sm table-bordered table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th>Member</th>
                            <th>Order #</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Proof</th>
                            <th>Invoice</th>
                            <th>Item Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php
                            $currentMember = null;
                            $currentOrder = null;
                        @endphp
                        
                        @forelse($orders as $order)
                            @foreach($order->items as $item)
                                <tr class="{{ $loop->first ? 'border-top border-primary' : '' }}">
                                    {{-- Member (only show on first item of new member) --}}
                                    <td>
                                        @if($currentMember !== $order->member_id)
                                            <strong>{{ $order->member->user->name ?? 'N/A' }}</strong>
                                            @php $currentMember = $order->member_id; @endphp
                                        @endif
                                    </td>
                                    
                                    {{-- Order # (only show on first item of new order) --}}
                                    <td>
                                        @if($currentOrder !== $order->id)
                                            <strong>#{{ $order->id }}</strong>
                                            @php $currentOrder = $order->id; @endphp
                                        @endif
                                    </td>
                                    
                                    {{-- Product --}}
                                    <td>{{ $item->product->name ?? 'Unknown Product' }}</td>
                                    
                                    {{-- Quantity --}}
                                    <td>{{ $item->quantity }}</td>
                                    
                                    {{-- Price --}}
                                    <td>₱{{ number_format($item->price * $item->quantity, 2) }}</td>
                                    
                                    {{-- Proof (only show on first item of order) --}}
                                    <td>
                                        @if($loop->first)
                                            @if($order->proof)
                                                <a href="{{ asset('storage/'.$order->proof) }}" target="_blank">
                                                    <img src="{{ asset('storage/'.$order->proof) }}" width="40">
                                                </a>
                                            @else
                                                <span class="text-muted">No Proof</span>
                                            @endif
                                        @endif
                                    </td>
                                    
                                    {{-- Invoice (only show on first item of order) --}}
                                    <td>
                                        @if($loop->first)
                                            <a href="{{ route('admin.orders.invoice', $order->id) }}" target="_blank" class="btn btn-sm btn-outline-primary">View</a>
                                        @endif
                                    </td>
                                    
                                    {{-- Item Status --}}
                            
<td>
    @if($item->status === 'Delivered')
        {{-- Show badge only, no dropdown --}}
        <div class="status-badge mt-1">
            <span class="badge badge-success">Delivered</span>
        </div>
    @else
        <form method="POST" action="{{ route('admin.orders.updateItemStatus', $item->id) }}" class="item-status-form">
            @csrf
            <select name="status" class="form-control form-control-sm item-status-select" data-item-id="{{ $item->id }}">
                @foreach(\App\Models\OrderItem::getStatuses() as $status)
                    <option value="{{ $status }}" {{ $item->status === $status ? 'selected' : '' }}>
                        {{ $status }}
                    </option>
                @endforeach
            </select>

            <div class="status-badge mt-1">
                @switch($item->status)
                    @case('In process')
                        <span class="badge badge-warning">In process</span>
                        @break
                    @case('On the Way')
                        <span class="badge badge-info">On the Way</span>
                        @break
                    @case('Cancelled')
                        <span class="badge badge-danger">Cancelled</span>
                        @break
                    @default
                        <span class="badge badge-secondary">Pending</span>
                @endswitch
            </div>
        </form>
    @endif
</td>

                                </tr>
                            @endforeach
                        @empty
                            <tr><td colspan="8" class="text-center text-muted">No orders found.</td></tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{-- Pagination (only works if you use ->paginate() in controller) --}}
            <div class="mt-3">
                {{ method_exists($orders, 'links') ? $orders->withQueryString()->links() : '' }}
            </div>
        </div>
    </div>
</div>
@endsection
@include('partials.mobile-footer')
@section('js')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('salesChart').getContext('2d');
    const chartData = @json($chartData ?? []);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.dates || [],
            datasets: [{
                label: 'Total Sales',
                data: chartData.totals || [],
                backgroundColor: 'rgba(54, 162, 235, 0.3)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: true,
                tension: 0.3
            }]
        }
    });
</script>

<script>
function confirmStatusChange(form) {
    const select = form.querySelector('select[name="status"]');
    const newStatus = select.value;
    return confirm(`Are you sure you want to change the status to "${newStatus}"?`);
}
</script>
<script>
// Handle item status changes
document.querySelectorAll('.item-status-select').forEach(select => {
    select.addEventListener('change', function (e) {
        e.preventDefault();
        const form = this.closest('form');
        const newStatus = this.value;
        const itemId = this.getAttribute('data-item-id');

        Swal.fire({
            title: 'Are you sure?',
            text: `Change item status to "${newStatus}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            } else {
                // Revert the dropdown to its original value if cancelled
                window.location.reload();
            }
        });
    });
});

// Add visual styling to group orders
document.addEventListener('DOMContentLoaded', function() {
    let currentOrder = null;
    
    document.querySelectorAll('tbody tr').forEach(row => {
        const orderCell = row.querySelector('td:nth-child(2)');
        const orderText = orderCell.textContent.trim();
        
        if (orderText) {
            if (currentOrder !== orderText) {
                row.classList.add('table-active');
                currentOrder = orderText;
            }
        }
    });
});
</script>

@endsection
