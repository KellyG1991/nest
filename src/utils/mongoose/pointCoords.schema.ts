import { prop, arrayProp } from "@typegoose/typegoose";

export class PointCoordsSchema {
    @prop({ type: String, default: 'Point' })
    type: string;

    @arrayProp({
        type: Number,
        validate: function() {
            return this.coordinates.length === 2;
        },
        required: true,
    })
    coordinates: number[];
}
