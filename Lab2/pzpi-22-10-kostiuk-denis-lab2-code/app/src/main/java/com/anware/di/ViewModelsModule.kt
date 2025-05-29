package com.anware.di

import com.anware.MainViewModel
import com.anware.ui.home.HomeViewModel
import com.anware.ui.login.LoginViewModel
import com.anware.ui.search.SearchViewModel
import org.koin.core.module.dsl.viewModel
import org.koin.dsl.module


val viewModelsModule = module {

    viewModel { LoginViewModel(
        get(),
        get()
    ) }

    viewModel { HomeViewModel(
        get(),
        get(),
        get()
    ) }

    viewModel { SearchViewModel(
        get(),
        get()
    ) }

    viewModel { MainViewModel(
        get(),
        get()
    ) }

}