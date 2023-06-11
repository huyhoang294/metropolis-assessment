<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisitorResource;
use App\Models\Visitor;
use App\Http\Requests\StoreVisitorRequest;
use App\Http\Requests\UpdateVisitorRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index()
    {
        return VisitorResource::collection(
            Visitor::query()->orderBy('id', 'asc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreVisitorRequest $request
     * @return Response
     */
    public function store(StoreVisitorRequest $request)
    {
        $data = $request->validated();
        $data['check_in'] = date('d-m-Y H:i:s');
        $visitor = Visitor::create($data);
        return response(new VisitorResource($visitor), 201);
    }

    public function search(Request $request)
    {
        $search = $request->search;
        $dateTime = $request->dateTime;
        $transport = $request->transportFilter;
        $query = Visitor::query();

        if(!empty($search)) {
            $query->where('name','LIKE',"%$search%")
            ->orWhere('email','LIKE',"%$search%")
            ->orWhere('phone_number','LIKE',"%$search%");
        }

        if(!empty($dateTime)) {
            $query->whereDate('check_in', '=', "$dateTime");
        }

        if(!empty($transport)) {
            if($transport === 'vehicle')
                $query->where('has_vehicle','=', 1);
        }

        return VisitorResource::collection(
            $query
                ->orderBy('id', 'asc')
                ->paginate(10)
        );
    }

    /**
     * Display the specified resource.
     *
     * @param Visitor $visitor
     * @return VisitorResource
     */
    public function show(Visitor $visitor): VisitorResource
    {
        return new VisitorResource($visitor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateVisitorRequest $request
     * @param Visitor $visitor
     * @return VisitorResource
     */
    public function update(UpdateVisitorRequest $request, Visitor $visitor)
    {
        $data = $request->validated();
        $visitor->update($data);

        return new VisitorResource($visitor);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Visitor $visitor
     * @return Response
     */
    public function destroy(Visitor $visitor)
    {
        $visitor->delete();

        return response("", 204);
    }
}
