import { closestCorners, CollisionDetection, pointerWithin, rectIntersection } from "@dnd-kit/core";

export const collisionDetection: CollisionDetection = (args) => {
    // if dragging column, use rectangular intersection collision
    if(args.active?.data?.current?.type === 'COL') {
        return rectIntersection({
            ...args,
            droppableContainers: args.droppableContainers.filter(dc => dc?.data?.current?.type === 'COL'),
        });
    }
    
    const pointerCollisions = pointerWithin(args);
    if(pointerCollisions.length > 0) {
        console.log("POINTER", pointerCollisions);
        return pointerCollisions;
    }

    const cornerCollisions = closestCorners(args);
    if(cornerCollisions.length > 0) {
        console.log("CORNERS", cornerCollisions);
        return pointerCollisions;
    }

    const rectCollisions = rectIntersection(args);
    console.log("RECT", rectCollisions);
    return rectCollisions;
}