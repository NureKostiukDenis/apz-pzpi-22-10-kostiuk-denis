package com.anware.repository

open class BearerToken(
    private val rawToken: String
) {
    override fun toString(): String {
        return "Bearer $rawToken"
    }
}