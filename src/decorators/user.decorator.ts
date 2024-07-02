import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | string[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException(
        'User not found. Use the AuthGuard to get user.',
      );
    }

    const userFilted = {};
    if (Array.isArray(data)) {
      data.forEach((d) => (userFilted[d] = request.user[d]));
      return (request.user = userFilted);
    } else if (data) {
      userFilted[data] = request.user[data];
      return (request.user = userFilted);
    }
    return request.user;
  },
);
