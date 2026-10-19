export interface Point {
  x: number;
  y: number;
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculates intersection of line from center of box A to center of box B with box boundaries.
 */
export function getBoxIntersection(fromBox: Box, toCenter: Point): Point {
  const fromCenter: Point = {
    x: fromBox.x + fromBox.width / 2,
    y: fromBox.y + fromBox.height / 2
  };

  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  if (dx === 0 && dy === 0) {
    return fromCenter;
  }

  const halfWidth = fromBox.width / 2;
  const halfHeight = fromBox.height / 2;

  const slopeX = halfWidth / Math.abs(dx || 0.0001);
  const slopeY = halfHeight / Math.abs(dy || 0.0001);

  const scale = Math.min(slopeX, slopeY);

  return {
    x: fromCenter.x + dx * scale,
    y: fromCenter.y + dy * scale
  };
}

/**
 * Computes optimal connection line points between two boxes with padding for markers.
 */
export function computeConnection(
  source: Box,
  target: Box
): {
  start: Point;
  end: Point;
  midPoint: Point;
  angle: number;
} {
  const sourceCenter: Point = {
    x: source.x + source.width / 2,
    y: source.y + source.height / 2
  };
  const targetCenter: Point = {
    x: target.x + target.width / 2,
    y: target.y + target.height / 2
  };

  const start = getBoxIntersection(source, targetCenter);
  const end = getBoxIntersection(target, sourceCenter);

  const midPoint: Point = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2
  };

  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  return { start, end, midPoint, angle };
}
