@extends('adminlte::page')

@section('title', 'Pending Members')

@section('content_header')
    <h1>Pending Member Approvals</h1>
@stop

@section('content')
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Members Awaiting Approval</h3>
        </div>
        <div class="card-body">
            @if($pendingMembers->count() > 0)
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Registered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($pendingMembers as $member)
                                <tr>
                                    <td>{{ $member->first_name }} {{ $member->last_name }}</td>
                                    <td>{{ $member->mobile_number }}</td>
                                    <td>{{ $member->created_at->format('M d, Y') }}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#approveModal{{ $member->id }}">
                                            <i class="bi bi-check"></i> Approve
                                        </button>
                                        <form action="{{ route('admin.members.reject', $member->id) }}" method="POST" class="d-inline">
                                            @csrf
                                            <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure you want to reject this member?')">
                                                <i class="bi bi-x"></i> Reject
                                            </button>
                                        </form>
                                    </td>
                                </tr>

                                <!-- Approve Modal -->
                                <div class="modal fade" id="approveModal{{ $member->id }}" tabindex="-1" role="dialog" aria-labelledby="approveModalLabel{{ $member->id }}" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <form action="{{ route('admin.members.approve', $member->id) }}" method="POST">
                                                @csrf
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="approveModalLabel{{ $member->id }}">Approve {{ $member->first_name }} {{ $member->last_name }}</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <label for="sponsor_id">Select Sponsor</label>
                                                        <select name="sponsor_id" id="sponsor_id" class="form-control" required>
                                                            <option value="">-- Select Sponsor --</option>
                                                            @foreach($sponsors as $sponsor)
                                                                <option value="{{ $sponsor->id }}">{{ $sponsor->first_name }} {{ $sponsor->last_name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="membership_code">Membership Code</label>
                                                        <select name="membership_code" id="membership_code" class="form-control" required>
                                                            <option value="">-- Select Membership Code --</option>
                                                            @foreach($availableCodes as $code)
                                                                <option value="{{ $code->code }}">{{ $code->code }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <button type="submit" class="btn btn-primary">Approve Member</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @else
                <div class="alert alert-info">
                    <i class="bi bi-info-circle"></i> No pending members found.
                </div>
            @endif
        </div>
    </div>
@stop

@section('css')
    <style>
        @media (max-width: 576px) {
            .table-responsive {
                overflow-x: auto;
            }
            .btn {
                margin-bottom: 5px;
                display: block;
                width: 100%;
            }
        }
    </style>
@stop

@section('js')
    <script>
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
@stop