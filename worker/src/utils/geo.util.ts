import {
  computeDestinationPoint,
  getBoundsOfDistance,
} from "geolib"

import { Point } from "@/dtos/point.dto"

export const getRateLatLon = (point: Point, distance: number): { rLat: number, rLon: number } => {

    const pos1 = computeDestinationPoint(
        { latitude: point.latitude, longitude: point.longitude },
        distance,
        180
    )

    const pos2 = computeDestinationPoint(
        { latitude: point.latitude, longitude: point.longitude },
        distance,
        90
    )

    return {
        rLat: pos1.latitude - point.latitude,
        rLon: pos2.longitude - point.longitude
    }

}

/**
 * @param  {Point} point
 * @param  {number} distance
 * @returns Point
 */
export const findARound = (point: Point, distance: number): { start: Point, end: Point } => {
    const lo = getBoundsOfDistance(
        point,
        distance
    )

    return {
        start: new Point(lo[0]),
        end: new Point(lo[1])
    }
}

/**
 * @param  {number} no
 * @returns number
 */
export const roundLatLon = (no: number): number => {
    return Math.round(no * 10000) / 10000
}