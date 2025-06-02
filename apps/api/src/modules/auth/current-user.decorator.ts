import { User } from '@magwishlist/infrastructure/prisma';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

interface GqlContext {
  req: Request & { user: User };
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GqlContext>().req.user;
  },
);
