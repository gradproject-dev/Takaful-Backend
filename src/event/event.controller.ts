import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EventService } from './providers/event.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @Auth(AuthType.None)
  getEvent(
    @Query('id') idRaw?: string,
    @Query('name') name?: string,
    @Query('location') location?: string,
  ) {
    const id = idRaw ? parseInt(idRaw, 10) : undefined;
    if (!id && !name && !location) {
      throw new BadRequestException(
        'Please specify at least one filter (e.g., id)',
      );
    }

    return this.eventService.getEvent({ where: { id, name, location } });
  }

  @Get('all')
  @Auth(AuthType.None)
  getAllEvents(@Query('charityId') idRaw?: string) {
    const charityId = idRaw ? parseInt(idRaw, 10) : undefined;
    return this.eventService.getAllEvents({
      where: { charity: { id: charityId } },
      select: {
        charity: {},
      },
    });
  }

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(FilesInterceptor('files'))
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3e7 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.eventService.createEvent(createEventDto, files);
  }

  @Patch()
  updateEvent(@Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(updateEventDto);
  }

  @Delete('soft/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventService.softDeleteEvent(id);
  }
}

////

// {
//   "cli": {
//     "version": ">= 16.3.2",
//     "appVersionSource": "remote"
//   },
//   "build": {
//     "development": {
//       "developmentClient": true,
//       "distribution": "internal"
//     },
//     "preview": {
//       "distribution": "internal"
//     },
//     "production": {
//       "autoIncrement": true
//     }
//   },
//   "submit": {
//     "production": {}
//   }
// }

/////////////////

// {
//   "expo": {
//     "name": "Takaful",
//     "slug": "Takaful",
//     "version": "1.0.0",
//     "orientation": "portrait",
//     "icon": "./assets/images/icon.png",
//     "scheme": "myapp",
//     "userInterfaceStyle": "automatic",
//     "newArchEnabled": true,
//     "ios": {
//       "supportsTablet": true,
//       "jsEngine": "jsc",
//       "bundleIdentifier": "com.rameztayem.Takaful",
//       "infoPlist": {
//         "ITSAppUsesNonExemptEncryption": false
//       }
//     },
//     "android": {
//       "adaptiveIcon": {
//         "foregroundImage": "./assets/images/adaptive-icon.png",
//         "backgroundColor": "#ffffff"
//       },
//       "package": "com.rameztayem.Takaful"
//     },
//     "web": {
//       "bundler": "metro",
//       "output": "static",
//       "favicon": "./assets/images/favicon.png"
//     },
//     "plugins": [
//       "expo-router",
//       [
//         "expo-splash-screen",
//         {
//           "image": "./assets/images/splash-icon.png",
//           "imageWidth": 200,
//           "resizeMode": "contain",
//           "backgroundColor": "#ffffff"
//         }
//       ],
//       "expo-secure-store"
//     ],
//     "experiments": {
//       "typedRoutes": true
//     },
//     "extra": {
//       "router": {
//         "origin": false
//       },
//       "eas": {
//         "projectId": "cd71bfbc-3a4d-46b3-877a-34bd5e3551f9"
//       }
//     },
//     "owner": "rameztayem"
//   }
// }
