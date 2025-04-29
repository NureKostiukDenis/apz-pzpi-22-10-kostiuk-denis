package com.anware.di

import com.anware.ui.home.HomeViewModel
import com.anware.ui.login.LoginViewModel
import com.anware.ui.search.SearchViewModel
import org.koin.core.module.dsl.viewModel
import org.koin.dsl.module


val viewModelsModule = module {

    viewModel { LoginViewModel(
        get()
    ) }

    viewModel { HomeViewModel(
        get()
    ) }

    viewModel { SearchViewModel(
        get()
    ) }

}