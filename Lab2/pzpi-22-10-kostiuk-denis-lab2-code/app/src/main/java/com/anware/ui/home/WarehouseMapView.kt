package com.anware.ui.home
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import androidx.core.content.ContextCompat
import com.anware.R
import com.anware.data.network.api.map.WarehouseSection
import kotlin.math.ceil
import kotlin.math.floor
import kotlin.math.max

class WarehouseMapView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private val desiredSectionWidth = 200f
    private val desiredSectionHeight = 300f
    private val minHorizontalSpacing = 20f
    private val minVerticalSpacing = 20f

    private val sectionVisuals = mutableListOf<SectionVisual>()
    private var warehouseSectionsData: List<WarehouseSection> = emptyList()
    private var listener: OnSectionClickListener? = null

    data class SectionVisual(
        val section: WarehouseSection,
        val bounds: RectF,
        var selected: Boolean = false
    )

    private val sectionPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.FILL
        color = ContextCompat.getColor(context, R.color.section_default_color)
    }

    private val selectedSectionPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.FILL
        color = ContextCompat.getColor(context, R.color.purple_200)
    }

    private val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.STROKE
        color = Color.BLACK
        strokeWidth = 3f
    }

    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.BLACK
        textSize = 30f
        textAlign = Paint.Align.CENTER
    }

    private val gatePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        style = Paint.Style.FILL
        color = Color.DKGRAY
    }

    private val gateTextPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.WHITE
        textSize = 20f
        textAlign = Paint.Align.CENTER
    }

    private val gateSize = 40f
    private val gatePadding = 10f
    private val gateBottomMargin = 10f

    private var visuallySelectedSectionName: String? = null

    interface OnSectionClickListener {
        fun onSectionClicked(section: WarehouseSection)
    }

    fun setOnSectionClickListener(listener: OnSectionClickListener) {
        this.listener = listener
    }

    fun setVisuallySelectedSection(sectionName: String?) {
        if (visuallySelectedSectionName != sectionName) {
            visuallySelectedSectionName = sectionName
            invalidate()
        }
    }
    fun isSectionSelected(section: WarehouseSection): Boolean{
        val newSection = sectionVisuals.find {
            it.section.sectionName.equals(section.sectionName)
        }
        return newSection?.selected ?: throw Exception("No section with name ${section.sectionName}")
    }

    fun setWarehouseData(sections: List<WarehouseSection>) {
        this.warehouseSectionsData = sections

        if (width > 0 && height > 0) {
            calculateAndSetLayout(width, height)
        }

        requestLayout()
        invalidate()
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        super.onSizeChanged(w, h, oldw, oldh)
        calculateAndSetLayout(w, h)
    }

    private fun calculateAndSetLayout(viewWidth: Int, viewHeight: Int) {
        sectionVisuals.clear()
        if (warehouseSectionsData.isEmpty() || viewWidth <= 0 || viewHeight <= 0) {
            invalidate()
            return
        }

        val availableWidth = viewWidth.toFloat() - paddingLeft - paddingRight
        val availableHeight = viewHeight.toFloat() - paddingTop - paddingBottom

        val maxCols = floor((availableWidth + minHorizontalSpacing) / (desiredSectionWidth + minHorizontalSpacing)).toInt()
            .coerceAtLeast(1)

        val rows = ceil(warehouseSectionsData.size.toFloat() / maxCols).toInt()

        val actualSectionWidth = max(
            (availableWidth - minHorizontalSpacing * (maxCols + 1)) / maxCols,
            100f
        )
        val actualSectionHeight = max(
            (availableHeight - minVerticalSpacing * (rows + 1)) / rows,
            150f
        )

        val horizontalSpacing = (availableWidth - (maxCols * actualSectionWidth)) / (maxCols + 1)
        val verticalSpacing = (availableHeight - (rows * actualSectionHeight)) / (rows + 1)

        warehouseSectionsData.forEachIndexed { index, section ->
            val row = index / maxCols
            val col = index % maxCols

            val left = paddingLeft + horizontalSpacing * (col + 1) + actualSectionWidth * col
            val top = paddingTop + verticalSpacing * (row + 1) + actualSectionHeight * row
            val right = left + actualSectionWidth
            val bottom = top + actualSectionHeight

            val bounds = RectF(left, top, right, bottom)

            sectionVisuals.add(SectionVisual(section, bounds))
        }

        invalidate()
    }


    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        sectionVisuals.forEach { visual ->
            val isSelected = visual.section.sectionName == visuallySelectedSectionName

            val radius = 20f
            canvas.drawRoundRect(visual.bounds, radius, radius, if (isSelected) selectedSectionPaint else sectionPaint)

            canvas.drawRoundRect(visual.bounds, radius, radius, borderPaint)

            val sectionTextX = visual.bounds.centerX()
            val sectionTextY = visual.bounds.centerY() - ((textPaint.descent() + textPaint.ascent()) / 2)
            canvas.drawText(visual.section.sectionName, sectionTextX, sectionTextY, textPaint)
        }
    }



    override fun onTouchEvent(event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_DOWN) {
            val touchX = event.x
            val touchY = event.y

            sectionVisuals.find { visual ->
                visual.bounds.contains(touchX, touchY)
            }?.let { clickedVisual ->
                listener?.onSectionClicked(clickedVisual.section)
                return true
            }
        }
        return super.onTouchEvent(event)
    }

     private fun getColorForSection(section: WarehouseSection): Int {
         val occupancy = section.items.size.toFloat() / section.capacity.toFloat()
         return when {
             occupancy > 0.8 -> Color.RED
             occupancy > 0.5 -> Color.YELLOW
             else -> ContextCompat.getColor(context, R.color.section_default_color)
         }
     }
}