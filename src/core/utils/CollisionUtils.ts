import { SpineView } from "../components/views/SpineView";
import { Container } from "pixi.js";
import Point = PIXI.Point;
import Bone = PIXI.spine.core.Bone;

export class CollisionUtils {

    public static getSpineCollisionPoints(spineView: SpineView): Array<Point> {
        const collisionPoints = new Array<Point>();
        const timeLines: Array<any> = <Array<any>>spineView.widget.state.getCurrent(0).animation.timelines;
        const pointX = spineView.x;
        const pointY = spineView.y;
        for (const timeline of timeLines) {
            if (timeline.boneIndex) {
                const bone = spineView.widget.skeleton.bones[timeline.boneIndex];
                this.addBoneCollisionPoints(bone, collisionPoints, pointX, pointY);
            }
        }

        return collisionPoints;
    }

    public static getContainerCollisionPoints(view: Container): Array<Point> {
        const x1 = view.x - view.pivot.x;
        const y1 = view.y - view.pivot.y;
        const x2 = x1 + view.width;
        const y2 = y1 + view.height;
        return [
            new Point(x1, y1),
            new Point(x2, y1),
            new Point(x2, y2),
            new Point(x1, y2)
        ];
    }

    public static isPointInPolygon(x: number, y: number, list: Array<Point>): boolean {
        let result = false;

        for (let i = 0, j = list.length - 1; i < list.length; j = i++) {
            let xi = list[i].x;
            let yi = list[i].y;

            let xj = list[j].x;
            let yj = list[j].y;

            if (yi >= y != yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi) {
                result = !result;
            }
        }

        return result;
    }

    public static isPolygonCollidePolygon(list1: Array<Point>, list2: Array<Point>): boolean {
        for (let i = 0; i < list1.length; i++) {
            const point = list1[i];
            if (this.isPointInPolygon(point.x, point.y, list2)) {
                return true
            }
        }
        return false;
    }

    public static isSpineCollideContainer(spine: SpineView, container: Container): boolean {
        const boyCollisionPoints = CollisionUtils.getSpineCollisionPoints(spine);
        const boxCollisionPoints = CollisionUtils.getContainerCollisionPoints(container);
        return CollisionUtils.isPolygonCollidePolygon(boyCollisionPoints, boxCollisionPoints)
    }

    private static addBoneCollisionPoints(bone: Bone, list: Array<Point>, deltaX: number, deltaY: number): void {
        list.push(new Point(bone.worldX + deltaX, bone.worldY + deltaY));
        for (const childBone of bone.children) {
            this.addBoneCollisionPoints(childBone, list, deltaX, deltaY);
        }
    }
}