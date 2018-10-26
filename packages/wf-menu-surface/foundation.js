import {CornerBit, MDCMenuSurfaceFoundation} from '@material/menu-surface';
import {numbers} from '@material/menu-surface/constants';

class WFMenuSurfaceFoundation extends MDCMenuSurfaceFoundation {
  get verticalAlignment() {
    return this.verticalAlignment_;
  }

  constructor(adapter) {
    super(adapter);

    this.verticalAlignment_;
  }

  /** @private */
  autoPosition_() {
    // Compute measurements for autoposition methods reuse.
    this.measures_ = this.getAutoLayoutMeasurements_();

    const corner = this.getOriginCorner_();
    const maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight_(corner);
    const verticalAlignment = (corner & CornerBit.BOTTOM) ? 'bottom' : 'top';
    let horizontalAlignment = (corner & CornerBit.RIGHT) ? 'right' : 'left';
    const horizontalOffset = this.getHorizontalOriginOffset_(corner);
    const verticalOffset = this.getVerticalOriginOffset_(corner);
    let position = {
      [horizontalAlignment]: horizontalOffset ? horizontalOffset : '0',
      [verticalAlignment]: verticalOffset ? verticalOffset : '0',
    };
    const {anchorWidth, surfaceWidth} = this.measures_;
    // Center align when anchor width is comparable or greater than menu surface, otherwise keep corner.
    if (anchorWidth / surfaceWidth > numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
      horizontalAlignment = 'center';
    }

    // If the menu-surface has been hoisted to the body, it's no longer relative to the anchor element
    if (this.hoistedElement_ || this.isFixedPosition_) {
      position = this.adjustPositionForHoistedElement_(position);
    }

    for (const prop in position) {
      if (position.hasOwnProperty(prop) && position[prop] !== '0') {
        position[prop] = `${parseInt(position[prop], 10)}px`;
      }
    }

    this.adapter_.setTransformOrigin(`${horizontalAlignment} ${verticalAlignment}`);
    this.adapter_.setPosition(position);
    this.adapter_.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + 'px' : '');

    this.verticalAlignment_ = verticalAlignment;

    // Clear measures after positioning is complete.
    this.measures_ = null;
  }
}

export default WFMenuSurfaceFoundation;
