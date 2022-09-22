<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicineController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
| 
*/

Route::middleware(['cors'])->group(function () {
    Route::get('/', function () {
        return redirect()->route('view.login');
    });
    
    
    Route::prefix('login')->group(function () {
        Route::get('/', [UserController::class, 'loginView'])->name('view.login');
        
    });
    
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'viewUsers'])->name('view.users');
        Route::post('/login', [UserController::class, 'loginAccount']);
        Route::post('/logout', [UserController::class, 'logoutAccount']);
        Route::post('/deactivate-reactivate', [UserController::class, 'changeStatus']);
        Route::post('/create-account', [UserController::class, 'saveUser']);
    });
    
    Route::prefix('patients')->group(function () {
        Route::get('/', [PatientController::class, 'viewPatients'])->name('view.patients');
        Route::post('/create-patient', [PatientController::class, 'createPatient']);
    });
    
    Route::prefix('medicines')->group(function () {
        Route::get('/', [MedicineController::class, 'viewMedicine'])->name('view.medicines');
        Route::post('/create-medicine', [MedicineController::class, 'createMedicine']);
    });
});


