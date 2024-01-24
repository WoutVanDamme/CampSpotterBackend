import { Camera as CameraPrisma } from '@prisma/client';

export class Camera {
    readonly cameraId: number;
    readonly latitude: string;
    readonly longtitude: string;
    readonly description: string;
    readonly confirmVotes: number;
    readonly denyVotes: number;
    readonly createdAt: Date;


    constructor(camera: {
        cameraId?: number;
        latitude: string;
        longitude: string;
        description: string;
        confirmVotes: number;
        denyVotes: number;
        createdAt: Date;
    }) {
        this.cameraId = camera.cameraId;
        this.latitude = camera.latitude;
        this.longtitude = camera.longitude;
        this.description = camera.description;
        this.confirmVotes = camera.confirmVotes;
        this.denyVotes = camera.denyVotes;
        this.createdAt = camera.createdAt;
    }

    equals({ cameraId, latitude, longtitude, description, confirmVotes, denyVotes, createdAt}): boolean {
        return (
            this.cameraId === cameraId &&
            this.latitude === latitude &&
            this.longtitude === longtitude &&
            this.description === description &&
            this.confirmVotes === confirmVotes &&
            this.denyVotes === denyVotes &&
            this.createdAt === createdAt
        );
    }

    static from({CameraId, latitude, longitude, description, confirmVotes, denyVotes, createdAt }: CameraPrisma) {
        return new Camera({
            cameraId: CameraId,
            latitude,
            longitude,
            description,
            confirmVotes,
            denyVotes,
            createdAt
        });
    }

}
