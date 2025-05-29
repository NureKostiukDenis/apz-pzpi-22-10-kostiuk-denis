package com.anware.data.network.api.map

import com.google.gson.annotations.SerializedName

data class WarehouseSection(
    @SerializedName("sectionName") val sectionName: String,
    @SerializedName("capacity") val capacity: Int,
    @SerializedName("items") val items: List<Item>,
    @SerializedName("gatesList") val gatesList: List<Gate>
)

data class Item(
    @SerializedName("id") val id: Int,
    @SerializedName("name") val name: String,
    @SerializedName("rfidTag") val rfidTag: String
)

data class Gate(
    @SerializedName("id") val id: Int,
    @SerializedName("code") val code: String,
    @SerializedName("type") val type: String
)

