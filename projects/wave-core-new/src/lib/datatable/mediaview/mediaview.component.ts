import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MediaviewDialogComponent} from './dialog/mediaview.dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VectorColumnDataType, VectorColumnDataTypes} from '../../operators/datatype.model';

@Component({
    selector: 'wave-datatable-mediaview',
    templateUrl: './mediaview.component.html',
    styleUrls: ['./mediaview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Dialog-Component
 * Checks the file-type of the comma-separated urls given as input-argument and sets up links to open a dialog.
 * The dialog will show the images or play the audios or videos.
 */
export class MediaviewComponent implements OnInit {
    mediaType: Array<string> = [];
    mediaUrls: Array<string> = [];

    @Input() url: any;

    @Input() type!: VectorColumnDataType;

    private urls: Array<string> = [];

    constructor(private readonly mediadialog: MatDialog) {}

    /**
     * Extracts the type (image, audio, video) of a given file-url string.
     */
    public static getType(value: string): string {
        let ret: string;
        if (!value || value === '') return (ret = '');
        const fileSplits = value.split('.') ?? [];
        if (fileSplits.length <= 1) return (ret = '');
        const fileEnding = fileSplits.pop()?.toLowerCase() ?? '';
        const imageArray = ['jpg', 'jpeg', 'gif', 'png', 'svg', 'bmp'];
        const audioArray = ['wav', 'mp3', 'ogg', 'aac'];
        const videoArray = ['webm', 'mp4', 'ogv'];

        const isMediaFile = imageArray.includes(fileEnding)
            ? (ret = 'image')
            : audioArray.includes(fileEnding)
            ? (ret = 'audio')
            : videoArray.includes(fileEnding)
            ? (ret = 'video')
            : (ret = 'text');
        if (!isMediaFile) ret = 'text';
        return ret;
    }

    /**
     * Gets the urls and file-types of the comma-separated urls given as input-argument.
     */
    ngOnInit(): void {
        if (this.type === VectorColumnDataTypes.Media) {
            this.urls = this.url.split(',');
            this.mediaType = new Array(this.urls.length);
            this.mediaUrls = [];

            for (const i in this.urls) {
                if (this.urls.hasOwnProperty(i)) {
                    this.mediaType[i] = MediaviewComponent.getType(this.urls[i]);
                    if (this.mediaType[i] !== '') {
                        this.urls[i] = this.urls[i].trim();
                    }
                    this.mediaUrls.push(this.urls[i]);
                }
            }
        } else {
            this.urls = [this.url.toString()];
            this.mediaType = [''];
            this.mediaUrls = [this.url.toString()];
        }
    }

    get media(): string {
        return this.mediaType[0] ?? '';
    }

    /**
     * Opens the media in a new dialog window.
     */
    public openMediaviewDialog(mediaID: number): void {
        this.mediadialog.open(MediaviewDialogComponent, {
            height: '80vh',
            width: '80vw',
            disableClose: true,
            panelClass: 'mediaviewDialogContainer',
            data: {mediaURLs: this.mediaUrls, currentMedia: mediaID, mediaTypes: this.mediaType},
        });
    }
}
