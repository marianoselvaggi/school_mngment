import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService
    ){}

    @Query(returns => LessonType)
    lesson() {
        return {
            id: 'sadada',
            name: 'something',
            startDate: (new Date()).toISOString(),
            endDate: (new Date()).toISOString()
        };
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('startDate') startDate: string,
        @Args('endDate') endDate: string,
    ):Promise<Lesson> {
        return this.lessonService.createLesson(name,startDate,endDate);
    }
}