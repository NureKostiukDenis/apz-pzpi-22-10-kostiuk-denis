package com.anware.di

import com.anware.data.api.auth.UserServices
import com.anware.data.api.map.MapServices
import com.anware.data.api.search.SearchService
import com.anware.data.local.UserLocalDataDAO
import com.anware.data.local.UserLocalDataDAOImpl
import com.anware.repository.MapRepository
import com.anware.repository.SearchRepository
import com.anware.repository.UserRepository
import org.koin.android.ext.koin.androidContext
import org.koin.dsl.module
import retrofit2.Retrofit

val userModule = module {

    single<UserLocalDataDAO> { UserLocalDataDAOImpl(androidContext()) }
    single<UserServices> { get<Retrofit>().create(UserServices::class.java) }
    single<MapServices> { get<Retrofit>().create(MapServices::class.java) }
    single<SearchService> { get<Retrofit>().create(SearchService::class.java) }

    factory {
        UserRepository(
            get(),
            get()
        )
    }

    factory {
        MapRepository(
            get(),
            get()
        )
    }

    factory {
        SearchRepository(
            get(),
            get()
        )
    }
}