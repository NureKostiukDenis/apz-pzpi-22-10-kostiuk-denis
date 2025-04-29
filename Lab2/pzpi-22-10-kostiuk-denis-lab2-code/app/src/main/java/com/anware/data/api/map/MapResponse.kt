package com.anware.data.api.map

import com.google.gson.annotations.SerializedName

data class WarehouseSection(
    @SerializedName("sectionName") val sectionName: String,
    @SerializedName("capacity") val capacity: Int,
    @SerializedName("items") val items: List<Item>,
    @SerializedName("gatesList") val gatesList: List<Gate>
)

data class Item(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("rfidTag") val rfidTag: String
)

data class Gate(
    @SerializedName("code") val code: String,
    @SerializedName("type") val type: String
)

