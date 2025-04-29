package com.anware

import android.app.Application
import com.anware.di.apiModule
import com.anware.di.userModule
import com.anware.di.viewModelsModule
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin

class MainApplication: Application() {

    override fun onCreate() {
        super.onCreate()
        startKoin {
            androidLogger()
            androidContext(this@MainApplication)
            modules( apiModule, userModule, viewModelsModule)
        }
    }

}