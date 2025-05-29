package com.anware.di

import com.anware.data.network.api.auth.UserServices
import com.anware.data.network.api.map.MapServices
import com.anware.data.network.api.search.SearchService
import com.anware.data.network.apiv2.gate.GateService
import com.anware.data.network.apiv2.item.ItemService
import com.anware.data.local.UserLocalDataDAO
import com.anware.data.local.UserLocalDataDAOImpl
import com.anware.repository.GateRepository
import com.anware.repository.ItemRepository
import com.anware.repository.MapRepository
import com.anware.repository.SearchRepository
import com.anware.repository.UserRepository
import org.koin.android.ext.koin.androidContext
import org.koin.core.qualifier.named
import org.koin.dsl.module
import retrofit2.Retrofit

val userModule = module {

    single<UserLocalDataDAO> { UserLocalDataDAOImpl(androidContext()) }

    single<MapServices> { get<Retrofit>(named("retrofit_v1")).create(MapServices::class.java) }
    single<SearchService> { get<Retrofit>(named("retrofit_v1")).create(SearchService::class.java) }

    single<ItemService> { get<Retrofit>(named("retrofit_v2")).create(ItemService::class.java) }
    single<GateService> { get<Retrofit>(named("retrofit_v2")).create(GateService::class.java) }

    factory { UserRepository(get(), get()) }
    factory { MapRepository(get(), get()) }
    factory { SearchRepository(get(), get()) }
    factory { GateRepository(get(), get()) }
    factory { ItemRepository(get(), get()) }
}
