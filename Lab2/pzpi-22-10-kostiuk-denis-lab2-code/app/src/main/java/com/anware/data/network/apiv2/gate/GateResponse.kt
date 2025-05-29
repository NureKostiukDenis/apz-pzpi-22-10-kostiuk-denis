package com.anware.data.network.apiv2.gate

data class GateResponse(
    val id: Int?,
    val code: String,
    val warehouseId: Int?,
    val type: String? = null,
    val sectionId: Int? = null,
)
