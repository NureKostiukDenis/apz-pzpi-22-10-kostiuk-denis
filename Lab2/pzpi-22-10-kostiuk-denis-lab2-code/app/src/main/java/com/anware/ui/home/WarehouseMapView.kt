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
import com.anware.data.api.map.WarehouseSection
import kotlin.math.E
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

        val maxColsByWidth = floor((availableWidth + minHorizontalSpacing) / (desiredSectionWidth + minHorizontalSpacing)).toInt()
        val cols = max(1, maxColsByWidth)

        val rows = ceil(warehouseSectionsData.size.toFloat() / cols.toFloat()).toInt()
        if (rows == 0) {
            invalidate()
            return
        }

        val totalSectionsWidth = cols * desiredSectionWidth
        val totalHorizontalPadding = availableWidth - totalSectionsWidth

        val actualHorizontalSpacing = if (cols > 0) totalHorizontalPadding / (cols + 1) else 0f

        val totalSectionsHeight = rows * desiredSectionHeight
        val totalVerticalPadding = availableHeight - totalSectionsHeight

        val actualVerticalSpacing = if (rows > 0) totalVerticalPadding / (rows + 1) else 0f

        warehouseSectionsData.forEachIndexed { index, section ->
            val currentRow = index / cols
            val currentCol = index % cols

            val left = paddingLeft + actualHorizontalSpacing + currentCol * (desiredSectionWidth + actualHorizontalSpacing)
            val top = paddingTop + actualVerticalSpacing + currentRow * (desiredSectionHeight + actualVerticalSpacing)

            val right = left + desiredSectionWidth
            val bottom = top + desiredSectionHeight
            val bounds = RectF(left, top, right, bottom)

            sectionVisuals.add(SectionVisual(section, bounds))
        }

        invalidate()
    }


    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        sectionVisuals.forEach { visual ->

            val isSelected = visual.section.sectionName == visuallySelectedSectionName

            canvas.drawRect(visual.bounds, if (isSelected) selectedSectionPaint else sectionPaint)
            canvas.drawRect(visual.bounds, borderPaint)

            val sectionTextX = visual.bounds.centerX()
            val sectionTextY = visual.bounds.centerY() - ((textPaint.descent() + textPaint.ascent()) / 2) - gateSize
            canvas.drawText(visual.section.sectionName, sectionTextX, sectionTextY, textPaint)

            val gates = visual.section.gatesList

            if (gates.isNotEmpty()) {
                val gateY = visual.bounds.bottom - gateBottomMargin - gateSize
                var currentGateX = visual.bounds.left + gatePadding

                gates.forEachIndexed { index, gate ->
                    if (currentGateX + gateSize <= visual.bounds.right - gatePadding) {
                        val gateRect = RectF(currentGateX, gateY, currentGateX + gateSize, gateY + gateSize)
                        canvas.drawRect(gateRect, gatePaint)

                        val gateTextX = gateRect.centerX()
                        val gateTextY = gateRect.centerY() - ((gateTextPaint.descent() + gateTextPaint.ascent()) / 2)
                        canvas.drawText(gate.code, gateTextX, gateTextY, gateTextPaint)

                        currentGateX += gateSize + gatePadding
                    } else {
                        return@forEachIndexed
                    }
                }
            }
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