import Weightlog from '@/model/Logs'

function minWeight(logs: Weightlog[]): number {
  return Math.min(...logs.map(log => log.weight));
}

function maxWeight(logs: Weightlog[]): number {
  return Math.max(...logs.map(log => log.weight));
}

function minReps(logs: Weightlog[]): number {
  return Math.min(...logs.map(log => log.weight));
}

function maxReps(logs: Weightlog[]): number {
  return Math.max(...logs.map(log => log.weight));
}




