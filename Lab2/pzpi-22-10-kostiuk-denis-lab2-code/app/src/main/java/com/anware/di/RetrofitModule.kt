package com.anware.di

import com.anware.data.network.api.auth.UserServices
import com.anware.data.network.http.HttpClient
import okhttp3.OkHttpClient
import org.koin.core.qualifier.named
import org.koin.dsl.module
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.converter.scalars.ScalarsConverterFactory

private const val BASE_URL = "https://9ed6-195-78-100-206.ngrok-free.app/api/"

val networkModule = module {

    single(named("retrofit_base")) {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    single<UserServices> {
        get<Retrofit>(named("retrofit_base")).create(UserServices::class.java)
    }

    single {
        HttpClient(get(), get())
    }

    single(named("retrofit_v1")) {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .client(get<HttpClient>().getClient())
            .build()
    }

    single(named("retrofit_v2")) {
        Retrofit.Builder()
            .baseUrl("${BASE_URL}v2/")
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .client(get<HttpClient>().getClient())
            .build()
    }
}


