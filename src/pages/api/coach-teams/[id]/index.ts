import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { coachTeamValidationSchema } from 'validationSchema/coach-teams';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.coach_team
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCoachTeamById();
    case 'PUT':
      return updateCoachTeamById();
    case 'DELETE':
      return deleteCoachTeamById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCoachTeamById() {
    const data = await prisma.coach_team.findFirst(convertQueryToPrismaUtil(req.query, 'coach_team'));
    return res.status(200).json(data);
  }

  async function updateCoachTeamById() {
    await coachTeamValidationSchema.validate(req.body);
    const data = await prisma.coach_team.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteCoachTeamById() {
    const data = await prisma.coach_team.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
