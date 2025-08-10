@extends('adminlte::page')

@section('title', 'Wallet History')

@section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
@endsection

@section('content')
<div class="container-fluid">
    <div class="card rounded-3 shadow-sm">
        <div class="card-header  text-white">
            <h6 class="mb-0 text-white>Wallet Transaction History</h6>
        </div>

        <div class="card-body">
            {{-- Filter Form --}}
            <form method="GET" class="mb-3">
                <div class="row">
                    <div class="col-md-3 mb-2">
                        <select name="type" class="form-control">
                            <option value="">-- All Wallets --</option>
                            <option value="main" {{ request('type') == 'main' ? 'selected' : '' }}>Main Wallet</option>
                            <option value="cashback" {{ request('type') == 'cashback' ? 'selected' : '' }}>Cashback Wallet</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-2">
                        <input type="date" name="start_date" value="{{ request('start_date') }}" class="form-control" placeholder="Start Date">
                    </div>
                    <div class="col-md-3 mb-2">
                        <input type="date" name="end_date" value="{{ request('end_date') }}" class="form-control" placeholder="End Date">
                    </div>
                    <div class="col-md-3 mb-2">
                        <button class="btn btn-primary w-100">Search</button>
                    </div>
                </div>
            </form>

            {{-- Transactions Table --}}
            <div class="table-responsive d-none d-md-block">
                <table class="table table-bordered table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th>Date</th>
                            <th>Wallet</th>
                            <th>Description</th>
                            <th class="text-end">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($transactions as $tx)
                            <tr>
                                <td>{{ \Carbon\Carbon::parse($tx->created_at)->format('Y-m-d H:i') }}</td>
                                <td>
                                    <span class="badge bg-{{ $tx->wallet_type == 'main' ? 'primary' : 'success' }}">
                                        {{ ucfirst($tx->wallet_type) }}
                                    </span>
                                </td>
                                <td>{{ $tx->description }}</td>
                                <td class="text-end {{ $tx->amount < 0 ? 'text-danger' : 'text-success' }}">
                                    ₱{{ number_format($tx->amount, 2) }}
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="text-center text-muted">No transactions found.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {{-- Mobile Card Layout --}}
            <div class="d-block d-md-none">
                @forelse ($transactions as $tx)
                    <div class="card mb-2 border">
                        <div class="card-body p-2">
                            <div class="d-flex justify-content-between">
                                <small class="text-muted">{{ \Carbon\Carbon::parse($tx->created_at)->format('Y-m-d H:i') }}</small>
                                <span class="badge bg-{{ $tx->wallet_type == 'main' ? 'primary' : 'success' }}">
                                    {{ ucfirst($tx->wallet_type) }}
                                </span>
                            </div>
                            <div class="fw-bold mt-1">{{ $tx->description }}</div>
                            <div class="text-end mt-1 {{ $tx->amount < 0 ? 'text-danger' : 'text-success' }}">
                                ₱{{ number_format($tx->amount, 2) }}
                            </div>
                        </div>
                    </div>
                @empty
                    <p class="text-muted text-center">No transactions found.</p>
                @endforelse
            </div>

            {{-- Pagination --}}
            <div class="mt-3">
                {{ $transactions->links() }}
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    
    {{-- Toastr Success/Error Messages --}}
    @if(session('success'))
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                toastr.success("{{ session('success') }}", "Success", {
                    timeOut: 3000,
                    progressBar: true,
                    positionClass: 'toast-top-right'
                });
            });
        </script>
    @endif

    @if(session('error'))
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                toastr.error("{{ session('error') }}", "Error", {
                    timeOut: 5000,
                    progressBar: true,
                    positionClass: 'toast-top-right'
                });
            });
        </script>
    @endif
@endsection

{{-- @include('partials.mobile-footer') --}}
