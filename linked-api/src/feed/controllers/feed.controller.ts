import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/post.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Post()
  create(@Body() post: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(post);
  }

  @Get()
  getAllPosts(): Observable<FeedPost[]> {
    return this.feedService.getAllPosts();
  }

  @Put('update/:id')
  updatePost(
    @Body() post: FeedPost,
    @Param('id', ParseIntPipe) id: number,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, post);
  }

  @Delete('delete/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
