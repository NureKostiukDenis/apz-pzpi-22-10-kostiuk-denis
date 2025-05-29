package com.anware.data.network.apiv2.item

import android.os.Build
import androidx.annotation.RequiresApi
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import java.util.Locale

data class ItemResponse(
    val id: Int?,
    val rfidTag: String,
    val name: String?,
    val warehouseId: Int,
    val createdAt: String,
    val updatedAt: String,
    val sectionName: String? = null,
)

@RequiresApi(Build.VERSION_CODES.O)
fun formatDisplayDateTime(dateTimeString: String?): String {
    if (dateTimeString.isNullOrBlank()) {
        return "N/A"
    }
    return try {
        val parsedLocalDateTime = LocalDateTime.parse(dateTimeString, DateTimeFormatter.ISO_LOCAL_DATE_TIME)

         val outputFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy -- HH:mm", Locale.getDefault())

        parsedLocalDateTime.format(outputFormatter)
    } catch (e: DateTimeParseException) {
        dateTimeString
    } catch (e: Exception) {
        dateTimeString
    }
}